import {Loader} from "lucide-react"

const LodingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
        <Loader className="size-10 animate-spin m-5"/>
        <h1 className="text-[26px] font-bebas">Textrovert</h1>
        <div className="flex flex-col items-center absolute bottom-10">
            <p className="text-[16px] font-asimovian">From</p>
            <h1 className="text-[26px] font-asimovian">ByteMe</h1>
        </div>
    </div>
  )
}

export default LodingScreen