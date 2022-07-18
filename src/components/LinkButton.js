import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./styled";

export default function LinkButton({ path, children, ...props }) {
    const navigate = useNavigate()

    const navigatePage = useCallback(() => {
        navigate(path)
    }, [navigate, path])

    return (
        <Button onClick={navigatePage} variant="text" {...props}>
            { children }
        </Button>
    )
}