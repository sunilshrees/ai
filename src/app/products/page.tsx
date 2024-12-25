import ProductDemoComponent from '@/components/landingpage/ProductsPage/ProductDemoComponent'
import { API_URLS } from '@/constants/ApiRoutes'
import React from 'react'

async function getProducts() {
  try {
    const res = await fetch(`${API_URLS.GET_PRODUCT_API}`, {
      cache: 'no-store',
    })
    const response = await res.json()

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return response?.data
  } catch (error) {
    return null
  }
}

async function getProductsDemo() {
  try {
    const res = await fetch(`${API_URLS.GET_PRODUCT_DEMO_API}`, {
      cache: 'no-store',
    })
    const response = await res.json()

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return response?.data
  } catch (error) {
    return null
  }
}

const Index = async () => {
  const data = await getProducts()
  const demoData = await getProductsDemo()

  return (
    <main className="w-full h-full relative pt-[3rem] md:pt-[6.875rem] pb-[50px]">
      <section className=" max-w-screen-ml 2xl:max-w-screen-xl mx-auto w-full h-full px-4 lg:px-0">
        {data &&
          data?.map((deta: any, index: any) => (
            <React.Fragment key={index}>
              <div className="max-w-[50rem] mx-auto w-full flex flex-col justify-center items-center text-center  ">
                <h1 className="text-[1.75rem] font-clash-display">
                  {deta?.name}
                </h1>
                <p className="text-justify text-p3 2xl:text-p2">
                  <div
                    className="break-words text-editor-content"
                    dangerouslySetInnerHTML={{
                      __html: deta?.description,
                    }}
                  ></div>
                </p>
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[3.125rem] my-[6.25rem]">
                {deta?.details &&
                  deta?.details?.length > 0 &&
                  data?.map((deta: any, idx: any) => (
                    <div
                      className=" p-[1.75rem] h-fit flex flex-col justify-between"
                      key={idx}
                    >
                      <h1 className="font-clash-display text-[1.75rem] text-[#FAF5ED] opacity-70 mb-[0.5rem]">
                        {idx + 1 < 10 ? `0${idx + 1}` : idx}
                      </h1>
                      <div className="w-[2.75rem] h-[2.75rem] flex justify-center items-center more-feature-card !rounded-[0.625rem] cursor-pointer">
                        <img src="/images/machine-learning.svg" alt="" />
                      </div>
                      <h1 className="text-[1.75rem] mb-[0.75rem] font-clash-display">
                        {deta?.name}
                      </h1>
                      <p className="text-justify text-p3 2xl:text-p2">
                        <div
                          className="break-words text-editor-content"
                          dangerouslySetInnerHTML={{
                            __html: deta?.description,
                          }}
                        ></div>
                      </p>
                    </div>
                  ))}
              </div>
            </React.Fragment>
          ))}
        {/* <div className="max-w-[50rem] mx-auto w-full flex flex-col justify-center items-center text-center mb-[6.25rem] ">
          <h1 className="text-[1.75rem] font-clash-display">
            Industry Solutions
          </h1>
          <p className="text-[1rem]">
            AI platforms provide the infrastructure, tools, and services needed
            to develop, deploy, and manage AI solutions. These platforms can be
            used by businesses to build custom AI applications or leverage
            pre-built models and services.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-[1rem] my-[6.25rem] produts-solution-bg p-[0.5rem] md:p-[1rem] relative">
          <div className="eclipse-gradient absolute top-[85%] -left-[25%]"></div>

          {new Array(4).fill(null)?.map((data, index) => (
            <div
              className=" p-[1rem] md:p-[1.75rem] h-fit flex flex-col justify-between"
              key={index}
            >
              <div className="w-[2.75rem] h-[2.75rem] flex justify-center items-center more-feature-card !rounded-[0.625rem] cursor-pointer mb-[0.25rem]">
                <img src="/images/machine-learning.svg" alt="" />
              </div>
              <h1 className="text-[1.25rem] mb-[0.5rem] font-clash-display">
                Machine Learning Models
              </h1>
              <p className="text-[1rem]">
                AI platforms provide the infrastructure, tools, and services
                needed to develop, deploy, and manage AI solutions. These
                platforms can be used by businesses to build custom AI
                applications or leverage .
              </p>
            </div>
          ))}
        </div> */}
        <section className="max-w-screen-lg 2xl:max-w-screen-ml mx-auto w-full h-full">
          <div className="max-w-[50rem] mx-auto w-full flex flex-col justify-center items-center text-center mb-[6.25rem] ">
            <h1 className="text-[1.75rem] font-clash-display">Product Demos</h1>
            <p className="text-[1rem]">
              Interactive demos or videos showcasing product capabilities.
            </p>
          </div>

          <ProductDemoComponent demoData={demoData} />
        </section>
      </section>
    </main>
  )
}

export default Index
