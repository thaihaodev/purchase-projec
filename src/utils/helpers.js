export const formatNameFileUpload = (name) => {
    const maxLength = 10;
    const extIndex = name.lastIndexOf(".");
    if (extIndex === -1) return name;

    const extension = name.slice(extIndex);
    const baseName = name.slice(0, extIndex);

    if (baseName.length <= maxLength) return name;

    const firstPart = baseName.slice(0, 5);
    const lastPart = baseName.slice(-3);
    return `${firstPart}...${lastPart}${extension}`;
};