import MainLayout from "@/layouts//MainLayout"
import { memo } from "react"

const HomePage: React.FC = () => {
  return (
    <MainLayout title='Dashboard'>
      <div className="flex min-h-[60vh]">
        <div className="m-auto">
          Welcome
        </div>
      </div>
    </MainLayout>
  )
}

export default memo(HomePage)
