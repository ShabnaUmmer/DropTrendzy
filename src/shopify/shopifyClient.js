// src/shopify/ShopifyClient.js
class ShopifyClient {
  constructor() {
    this.storeDomain = process.env.REACT_APP_SHOPIFY_DOMAIN || 'droptrendzy.myshopify.com';
    this.storefrontAccessToken = process.env.REACT_APP_SHOPIFY_TOKEN || 'a678f5fb20510e950b4286b649a85c80';
    this.apiVersion = '2024-01';
    
    // Validate credentials
    if (!this.storeDomain || !this.storefrontAccessToken) {
      console.warn('⚠️ Shopify credentials not found in environment variables');
    }
    
    this.endpoint = `https://${this.storeDomain}/api/${this.apiVersion}/graphql.json`;
    console.log('✅ Shopify Client initialized:', this.storeDomain);
  }

  async query(query, variables = {}) {
    try {
      if (!this.storefrontAccessToken) {
        throw new Error('Storefront access token is missing');
      }

      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': this.storefrontAccessToken,
        },
        body: JSON.stringify({ query, variables }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.errors) {
        console.error('GraphQL Errors:', data.errors);
        throw new Error(data.errors[0].message);
      }

      return data.data;
    } catch (error) {
      console.error('Shopify query error:', error);
      throw error;
    }
  }

  async getProducts(first = 20) {
    const query = `
      query getProducts($first: Int!) {
        products(first: $first) {
          edges {
            node {
              id
              handle
              title
              description
              descriptionHtml
              featuredImage {
                url(transform: { maxWidth: 800 })
                altText
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 5) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    availableForSale
                    sku
                  }
                }
              }
              tags
              vendor
              productType
              totalInventory
              availableForSale
            }
          }
        }
      }
    `;
    return this.query(query, { first });
  }

  async getFullProductDescription(handle) {
    try {
      console.log(`🔄 Fetching full description for: ${handle}`);
      
      // Try to fetch from JSON API (no auth needed for public products)
      const jsonApiUrl = `https://${this.storeDomain}/products/${handle}.js`;
      console.log('JSON API URL:', jsonApiUrl);
      
      const response = await fetch(jsonApiUrl, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const productData = await response.json();
        console.log('✅ JSON API response:', {
          hasDescription: !!productData.description,
          descriptionLength: productData.description?.length,
          hasBodyHtml: !!productData.body_html,
          bodyHtmlLength: productData.body_html?.length
        });
        
        return {
          description: productData.description || '',
          descriptionHtml: productData.body_html || productData.description || ''
        };
      } else {
        console.warn('❌ JSON API failed:', response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error fetching full description:', error);
      return null;
    }
  }

  async getProductByHandle(handle) {
    const query = `
      query getProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          id
          handle
          title
          description
          descriptionHtml
          featuredImage {
            url(transform: { maxWidth: 800 })
            altText
          }
          images(first: 10) {
            edges {
              node {
                url(transform: { maxWidth: 800 })
                altText
                width
                height
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                availableForSale
                sku
                selectedOptions {
                  name
                  value
                }
                image {
                  url
                  altText
                }
              }
            }
          }
          options {
            name
            values
          }
          tags
          vendor
          productType
          totalInventory
          availableForSale
          createdAt
          updatedAt
          publishedAt
        }
      }
    `;
    
    try {
      console.log(`🔄 Fetching product: ${handle}`);
      const data = await this.query(query, { handle });
      
      if (!data?.productByHandle) {
        throw new Error('Product not found');
      }
      
      const product = data.productByHandle;
      
      // Debug the description we got from Storefront API
      console.log('📝 Storefront API Description Info:', {
        descriptionExists: !!product.description,
        descriptionLength: product.description?.length,
        descriptionPreview: product.description?.substring(0, 200),
        descriptionHtmlExists: !!product.descriptionHtml,
        descriptionHtmlLength: product.descriptionHtml?.length,
        descriptionHtmlPreview: product.descriptionHtml?.substring(0, 200)
      });
      
      // Check if description is truncated
      const isDescriptionTruncated = (
        (product.description && product.description.length < 500 && 
         (product.description.includes('...') || product.description.endsWith('...'))) ||
        (product.descriptionHtml && product.descriptionHtml.length < 500 && 
         (product.descriptionHtml.includes('...') || product.descriptionHtml.endsWith('...')))
      );
      
      if (isDescriptionTruncated) {
        console.log('⚠️ Description appears truncated, fetching full version...');
        
        // Fetch full description from JSON API
        const fullDescription = await this.getFullProductDescription(handle);
        
        if (fullDescription && (fullDescription.description || fullDescription.descriptionHtml)) {
          console.log('✅ Got full description from JSON API:', {
            newDescriptionLength: fullDescription.description?.length,
            newDescriptionHtmlLength: fullDescription.descriptionHtml?.length
          });
          
          // Update product with full description
          product.description = fullDescription.description || product.description;
          product.descriptionHtml = fullDescription.descriptionHtml || product.descriptionHtml;
          
          // Cache the full product data
          this.cacheFullProduct(handle, product);
        } else {
          console.warn('❌ Could not fetch full description, using truncated version');
        }
      } else {
        console.log('✅ Description looks complete');
      }
      
      return data;
    } catch (error) {
      console.error('Error in getProductByHandle:', error);
      throw error;
    }
  }

  // Cache full product data to avoid repeated API calls
  cacheFullProduct(handle, product) {
    try {
      const cacheKey = `droptrendzy_full_product_${handle}`;
      const cacheData = {
        product,
        timestamp: Date.now()
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
      console.log('✅ Product cached:', cacheKey);
    } catch (error) {
      console.warn('Could not cache product:', error);
    }
  }

  // Get cached product
  getCachedProduct(handle) {
    try {
      const cacheKey = `droptrendzy_full_product_${handle}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        const cacheData = JSON.parse(cached);
        // Check if cache is less than 1 hour old
        if (Date.now() - cacheData.timestamp < 3600000) {
          console.log('✅ Using cached product:', handle);
          return cacheData.product;
        }
      }
    } catch (error) {
      console.warn('Error reading cache:', error);
    }
    return null;
  }

  async testConnection() {
    try {
      const query = `
        query {
          shop {
            name
          }
        }
      `;
      
      const data = await this.query(query);
      return {
        success: true,
        shop: data.shop,
        message: 'Connected successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Connection failed'
      };
    }
  }

  // Test description fetching directly
  async testProductDescription(handle) {
    try {
      console.log('🧪 Testing product description for:', handle);
      
      // Test Storefront API
      const storefrontData = await this.getProductByHandle(handle);
      const storefrontProduct = storefrontData.productByHandle;
      
      console.log('📊 Storefront API Results:', {
        title: storefrontProduct.title,
        descriptionLength: storefrontProduct.description?.length,
        descriptionHtmlLength: storefrontProduct.descriptionHtml?.length
      });
      
      // Test JSON API directly
      const jsonResponse = await fetch(`https://${this.storeDomain}/products/${handle}.js`);
      if (jsonResponse.ok) {
        const jsonData = await jsonResponse.json();
        console.log('📊 JSON API Results:', {
          descriptionLength: jsonData.description?.length,
          bodyHtmlLength: jsonData.body_html?.length,
          fullDescription: jsonData.description?.substring(0, 300) + '...'
        });
      }
      
      return true;
    } catch (error) {
      console.error('Test error:', error);
      return false;
    }
  }
}

const shopifyClient = new ShopifyClient();
export { ShopifyClient, shopifyClient };
export default shopifyClient;