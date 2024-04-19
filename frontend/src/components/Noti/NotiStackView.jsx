import NotiCard from "./NotiCard";

function NotiStackView({notiState}) {
    let [notis, setNotis] = notiState
    console.log("pn", "Noti State is", notis)
    let a = []
    for (var i = 0; i < 100; i++) a.push(i);
    return (
        <div className="z-[30000] fixed top-0 right-0 pb-[10px] w-full md:w-[400px] flex flex-col gap-[0px] overflow-scroll max-h-screen scrollbar-hidden">
            {/* <NotiCard 
                    title={"Title"} message={"Message"} 
                    style={"default"}
                    onDismiss={() => {
                        
                    }}
                /> */}
            {/* {a.map((x,i) => {
                return <NotiCard 
                key={x}
                title={"Title"} message={"Message"} 
                style={"default"}
            />
            })} */}
            
            {notis.map((x, i) => {
                return <NotiCard 
                    key={x.id}
                    title={x.title} message={x.message} 
                    style={x.style}
                    onDismiss={() => {
                        setNotis(ns => ns.filter(n => n.id !== x.id))
                    }}
                />
            })}
        </div>
    );
}

export default NotiStackView;