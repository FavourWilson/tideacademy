
interface Inputprops{
    type:string
    className?: string
    value: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onchange: (text:any)=>void;
    placeholder:string
}
const Input = ({type = "text",className,value,onchange, placeholder}:Inputprops) => {
  return (
    <input 
    type={type} 
    placeholder={placeholder}
    className={`border-b-2 border-b-primary-100 outline-0 w-[300px] ${className}`}
    value={value}
    onChange={onchange}
    />
  )
}

export default Input