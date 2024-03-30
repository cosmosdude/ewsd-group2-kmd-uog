import profile0 from './profile-0.png'
import profile1 from './profile-1.png'
import profile2 from './profile-2.png'
import profile3 from './profile-3.png'
import profile4 from './profile-4.png'
import profile5 from './profile-5.png'
import profile6 from './profile-6.png'
import profile7 from './profile-7.png'
import profile8 from './profile-8.png'
import profile9 from './profile-9.png'
import profile10 from './profile-10.png'
import profile11 from './profile-11.png'
import profile12 from './profile-12.png'
import profile13 from './profile-13.png'
import profileClear from './profile-clear.png'

let images = [
    profile0, profile1, profile2, profile3, profile4, profile5, profile6,
    profile7, profile8, profile9, profile10, profile11, profile12, profile13
]

export function profile(id) {
    if (id == null) return profileClear
    return images[ (Math.abs(~~Number(id))) % images.length ]
}