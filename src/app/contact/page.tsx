import ContactUsForm from '@/components/ContactUsForm/ContactUsForm'
import FAQ from '@/components/FAQ/Index'
import SocialItem from '@/components/SocialItem'
import { API_URLS } from '@/constants/ApiRoutes'

async function getContactDetails() {
  try {
    const res = await fetch(`${API_URLS.GET_CONTACT_INFO_API}`, {
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
async function getSocialDetails() {
  try {
    const res = await fetch(`${API_URLS.GET_SOCIAL_INFO_API}`, {
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
async function getCustomerSupport() {
  try {
    const res = await fetch(`${API_URLS.GET_SUPPORT_INFO_API}`, {
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
async function getFAQ() {
  try {
    const res = await fetch(`${API_URLS.GET_FAQ_API}`, {
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
  const data = await getContactDetails()
  const socialData = await getSocialDetails()
  const customerSupportData = await getCustomerSupport()
  const faqData = await getFAQ()

  return (
    <main className="w-full h-full relative pt-[2rem] md:pt-[4.375rem] pb-[50px]">
      <section className=" max-w-screen-lg 2xl:max-w-screen-ml mx-auto w-full h-full px-4 md:px-0">
        <div className="contact-box w-full p-4 md:p-[3.25rem] grid md:grid-cols-5 gap-4">
          <div className="md:col-span-2 bg-[#010101] flex flex-col justify-between gap-y-[3rem] py-[1rem] md:py-[2.5rem] px-[1rem] md:px-[3rem] font-montserrat">
            <h1 className="font-clash-display text-[1.5rem]">
              Contact Information
            </h1>
            <div className="flex flex-col gap-[1rem]">
              <div className="flex gap-2 mb-1">
                <img src="/images/phone.svg" alt="" />
                <h1>{data?.phone ?? '-'}</h1>
              </div>
              <div className="flex gap-2 mb-1">
                <img src="/images/mail.svg" alt="" />
                <h1>{data?.email ?? '-'}</h1>
              </div>
              <div className="flex gap-2 mb-1">
                <img src="/images/location-white-icon.svg" alt="" />
                <h1>{data?.address ?? '-'}</h1>
              </div>
            </div>
            <div>
              <h1>Social Links</h1>
              <div className="flex gap-x-[10px] pt-2">
                {socialData?.map((sL: any) => (
                  <SocialItem data={sL} key={sL.id} />
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-3 md:pl-[3.125rem] flex justify-center items-center w-full">
            <ContactUsForm />
          </div>
        </div>
        <h1 className="text-[1.75rem] font-clash-display text-center my-[3rem] md:my-[6.25rem]">
          Customer support information and FAQ section.
        </h1>
        <div className="max-w-[48rem] mx-auto w-full h-full">
          <FAQ data={faqData} />
        </div>
        <div className="faq-bg-2 w-full py-[4.5rem]">
          <h1 className="text-[1.75rem] font-clash-display text-center mb-[3rem]">
            Customer support
          </h1>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 font-montserrat text-[1rem]">
            <h1>{customerSupportData?.[0]?.email ?? '-'}</h1>
            <h1>{customerSupportData?.[0]?.number ?? '-'}</h1>
            <h1>{customerSupportData?.[0]?.location ?? '-'}</h1>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Index
