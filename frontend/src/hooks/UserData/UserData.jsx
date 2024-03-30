import useEffectUserDetail from "../useEffectUserDetail"



export default function UserData({children}) {
    let user = useEffectUserDetail()
    return (
        <>
        {children}
        </>
    )
}