import { useCallback } from "react";

export default function useFormatCurrency() {
    const USER_LANGUAGE = window.navigator.language
    const formatNumber = useCallback((number) => {
        if (!number) {
            return (0).toLocaleString(
                'en-US',
                {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
                }
            ).replace(/\d/g, '').trim()
        }
        return new Intl.NumberFormat(USER_LANGUAGE, { style: 'currency', currency: 'USD' }).format(number)
    }, [])
    return formatNumber
}