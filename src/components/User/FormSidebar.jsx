
const FormSidebar = ({ title, tag }) => {
    return (
        <div className="loginSidebar bg-[#ab7de3] rounded-lg hover:bg-[#0e11e3] px-9 py-10 hidden sm:flex flex-col gap-4 w-2/5">
            <h1 className="font-medium text-white text-3xl">{title}</h1>
            <p className="text-gray-200 text-lg pr-2">{tag}</p>
        </div>
    )
}

export default FormSidebar