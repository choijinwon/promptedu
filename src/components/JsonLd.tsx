import Script from 'next/script';

interface JsonLdProps {
  type: 'website' | 'organization' | 'product' | 'article';
  data: any;
}

export default function JsonLd({ type, data }: JsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// 웹사이트용 JSON-LD
export function WebsiteJsonLd() {
  return (
    <JsonLd
      type="website"
      data={{
        name: 'PromptEdu',
        url: 'https://promptedu.io',
        description: 'AI 프롬프트 제작자와 사용자를 연결하는 최고의 프롬프트 마켓플레이스입니다.',
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: 'https://promptedu.io/marketplace?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
          {
            '@type': 'SearchAction',
            target: 'https://promptedu.io/ai-prompt',
            'query-input': 'required name=ai_prompt',
          },
          {
            '@type': 'SearchAction',
            target: 'https://promptedu.io/chatgpt-prompt',
            'query-input': 'required name=chatgpt_prompt',
          },
          {
            '@type': 'SearchAction',
            target: 'https://promptedu.io/prompt-purchase',
            'query-input': 'required name=prompt_purchase',
          },
          {
            '@type': 'SearchAction',
            target: 'https://promptedu.io/prompt-sale',
            'query-input': 'required name=prompt_sale',
          },
          {
            '@type': 'SearchAction',
            target: 'https://promptedu.io/korean-prompt',
            'query-input': 'required name=korean_prompt',
          }
        ],
      }}
    />
  );
}

// 조직용 JSON-LD
export function OrganizationJsonLd() {
  return (
    <JsonLd
      type="organization"
      data={{
        name: 'PromptEdu',
        url: 'https://promptedu.io',
        logo: 'https://promptedu.io/logo.png',
        sameAs: [
          'https://twitter.com/promptedu',
          'https://facebook.com/promptedu',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+82-XXX-XXXX-XXXX',
          contactType: 'customer service',
          email: 'support@promptedu.io',
        },
      }}
    />
  );
}

// 제품용 JSON-LD (프롬프트용)
export function ProductJsonLd({ 
  name, 
  description, 
  price, 
  currency = 'KRW',
  image,
  url 
}: {
  name: string;
  description: string;
  price: number;
  currency?: string;
  image: string;
  url: string;
}) {
  return (
    <JsonLd
      type="product"
      data={{
        name,
        description,
        image,
        url,
        offers: {
          '@type': 'Offer',
          price,
          priceCurrency: currency,
          availability: 'https://schema.org/InStock',
        },
        category: 'AI Prompt',
        brand: {
          '@type': 'Brand',
          name: 'PromptEdu',
        },
      }}
    />
  );
}
