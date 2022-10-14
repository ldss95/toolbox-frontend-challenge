import { memo } from "react";

const RenderIf = ({ condition, children }) => {
    if (condition) {
        return children
    }
    
    return <></>
}

export default memo(RenderIf);