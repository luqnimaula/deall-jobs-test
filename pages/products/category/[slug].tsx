import MainLayout from "@/layouts//MainLayout";
import Products, { ProductsProps } from "@/modules//products";
import { GetServerSideProps } from "next";
import { memo } from "react";

const PageProductsCategory: React.FC<ProductsProps> = (props) => {
  return (
    <MainLayout title='Products'>
      <Products {...props}/>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const {
    page,
    limit
  } = query

  return {
    props: {
      page: page ? (isNaN(parseInt(page as string)) ? 1 : parseInt(page as string)) : 1,
      limit: limit ? (isNaN(parseInt(limit as string)) ? 10 : parseInt(limit as string)) : 10
    }
  }
}

export default memo(PageProductsCategory)
