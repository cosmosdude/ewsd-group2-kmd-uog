import { useContext, useEffect, useState } from "react"
import AuthContext from "../contexts/AuthContext";

/**
 * @note 
 * Requires auth context to be valid.
 * */
// function useEffectContributionDetail(id, dependencies = undefined) {
//     if (!dependencies) dependencies = []
//     dependencies.push(id)

//     let accessToken = useContext(AuthContext)
//     let [contribution, setContribution] = useState({});

//     useEffect(() => {
//         // To handle abortion
//         let aborter = new AbortController()

//         async function fetchData() {
//             try {
//                 let response = await fetch(`http://127.0.0.1:8000/api/contributions/${id}`, {
//                     signal: aborter.signal,
//                     headers: {
//                         'Authorization': `Bearer ${accessToken}`,
//                         'Accept': 'application/json'
//                     }
//                 })
    
//                 let json = await response.json()
//                 if (response.status === 200) {
//                     let results = json.data 
//                     setContribution(results)
//                 }
//             } catch { }
//         }
//         // fetch async
//         fetchData()
//         // clean up by aborting the request
//         return () => { aborter.abort() }
//     }, dependencies)

//     return [contribution, setContribution]
// }

// export default useEffectContributionDetail;