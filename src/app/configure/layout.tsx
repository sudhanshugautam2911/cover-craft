import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Steps from "@/components/Steps";
import { ReactNode } from "react";

const Layout = ({children}: {children: ReactNode }) => {
    return (
        // learning - flex-col is important here (children will be laid out vertically and by default it is row)
        <MaxWidthWrapper className="flex flex-1 flex-col">
            <Steps/>
            {children}
        </MaxWidthWrapper>
    )
}

export default Layout;