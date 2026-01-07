

export default function InputField({type, name, placeholder, onChange, error}){
    return(
        <div className="flex flex-col">
            <input
                    type={type} 
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    className={`bg-zinc-800 placeholder:text-sm text-sm mt-1 w-full rounded-lg h-11 outline-0 p-2 
                    ${error ? "border-red-700 border":"border-gray-700 border-2"} `} />
            
            {error && <p className="text-red-600 text-xs font-sans">{error}</p>}
        </div>
    )
}