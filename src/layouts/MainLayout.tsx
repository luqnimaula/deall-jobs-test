import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useMemo } from 'react'
import clsxm from '../utils/clsxm'

type Props = {
  title: string
  children: React.ReactNode
}

const MainLayout: React.FC<Props> = ({ title, children }) => {
  const { pathname } = useRouter()
  const menus: {
    title: string
    href: string
    active: boolean
  }[] = useMemo(() => {
    return [
      {
        title: 'Products',
        href: '/products',
        active: pathname.startsWith('/products')
      },
      {
        title: 'Carts',
        href: '/carts',
        active: pathname.startsWith('/carts')
      }
    ]
  }, [pathname])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div className='grid grid-cols-12 lg:min-h-[100vh]'>
          <div className='col-span-12 lg:col-span-3 xl:col-span-2'>
            <Link href='/' className='flex h-[5rem]'>
              <div className='text-3xl font-semibold m-auto'>Dashboard</div>
            </Link>
            <div>
              {menus.map(({ title, href, active }, index) => (
                <Link
                  key={index}
                  href={href}
                  className={clsxm(
                    'block w-full px-4 py-3 hover:bg-gray-50',
                    active && 'bg-sky-50 hover:bg-sky-50 border-l-4 border-sky-500'
                  )}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>
          <div className='col-span-12 lg:col-span-9 xl:col-span-10 p-2 md:p-5 bg-gray-100 h-full'>{children}</div>
        </div>
      </main>
    </>
  )
}

export default memo(MainLayout)