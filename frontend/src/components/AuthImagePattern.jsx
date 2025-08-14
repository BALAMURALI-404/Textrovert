

const AuthImagePattern = ({title, subtitle}) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
        <div className="max-w-xl text-center">
            <div className="relative flex justify-center">
                <img src="/login_img.png" alt="" />
                <div className="absolute top-[40%] ">
                    <h1 className="text-5xl font-bebas">CONNECTING</h1>
                    <h1 className="text-4xl font-bebas">PEOPLE</h1>

                </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-base-content/60">{subtitle}</p>
        </div>
    </div>
  )
}

export default AuthImagePattern