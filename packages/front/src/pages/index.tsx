import type { NextPage } from "next"
import Link from "next/link"
// import { useApiClient } from "../provider/ApiClient"

const Home: NextPage = () => {
  // const apiClient = useApiClient()

  return (
    <div>
      <p className="text-red-100">hello, world</p>
      <p>
        <Link href="/profile">
          <a>プロフィールを見る</a>
        </Link>
      </p>
      <button>login</button>
    </div>
  )
}

export default Home
