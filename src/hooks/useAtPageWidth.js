import { useState, useEffect } from "react";

export default function useAtPageWidth({ xxs, xs, sm, md, lg, xl, xxl, default: defaultOption=null }) {
    const [ width, setWidth ] = useState(null)

    useEffect(() => {
        setWidth(getWidthValue({ xxs, xs, sm, md, lg, xl, xxl, defaultOption }))
    }, [])

    useEffect(() => {
        const listener = window.addEventListener('resize', () => {
            setWidth(getWidthValue({ xxs, xs, sm, md, lg, xl, xxl, defaultOption }))
        })

        return () => {
            window.removeEventListener('resize', listener)
        }
    }, [xxs, xs, sm, md, lg, xl, xxl, defaultOption])

    return width
}

function getWidthValue({ xxs, xs, sm, md, lg, xl, xxl, defaultOption }) {
    if (xxs !== null && window.innerWidth < 650) return xxs
    if (xs !== null && window.innerWidth < 850 && window.innerWidth >= 650) return xs
    if (sm !== null && window.innerWidth < 1050 && window.innerWidth >= 850) return sm
    if (md !== null && window.innerWidth < 1250 && window.innerWidth >= 1050) return md
    if (lg !== null && window.innerWidth < 1450 && window.innerWidth >= 1250) return lg
    if (xl !== null && window.innerWidth < 1650 && window.innerWidth >= 1450) return xl
    if (xxl !== null && window.innerWidth >= 1650) return xxl
    return defaultOption
}