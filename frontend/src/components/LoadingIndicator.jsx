import "../style/tailwind.css"

export default ({color, className, ...props}) => {
    let strokeColor = color ? color : "black"
    return (
        <div className={`${className} animate-spin w-[24px] h-[24px] flex items-center justify-center`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12C22 9.68645 21.1978 7.44447 19.7301 5.65607C18.2624 3.86767 16.22 2.6435 13.9509 2.19215C11.6818 1.7408 9.3264 2.09019 7.28603 3.18079C5.24566 4.27139 3.64656 6.03572 2.7612 8.17316C1.87585 10.3106 1.75901 12.6889 2.4306 14.9028C3.10219 17.1168 4.52065 19.0294 6.4443 20.3147C8.36795 21.6 10.6778 22.1786 12.9802 21.9518C15.2826 21.7251 17.4351 20.707 19.0711 19.0711" stroke={strokeColor} strokeWidth="2" strokeLinecap="round"/>
            </svg>
        </div>
    )
}