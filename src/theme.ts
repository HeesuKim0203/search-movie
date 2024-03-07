export const size = {
    laptop : 1400,
    tabletL : 1220,
    tabletS : 1024,
    mobileL : 768,
    mobileS : 768  
}

const theme = {
    laptop : `(max-width : ${size.laptop}px)`,
    tabletL : `(max-width : ${size.tabletL}px)`,
    tabletS : `(max-width : ${size.tabletS}px)`,
    mobileL : `(max-width : ${size.mobileL}px)`,
    mobileS : `(max-width : ${size.mobileS}px)`,
} ;

export default theme ;