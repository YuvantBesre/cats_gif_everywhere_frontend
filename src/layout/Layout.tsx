const Layout = ({ children } : any) => {
  return (
    <div 
        className="layout h-[100vh] w-full px-[200px] py-[50px]" 
    >
        { children }
    </div>
  )
}

export default Layout