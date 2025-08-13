import React, {
    useEffect,
    useState,
    isValidElement,
    cloneElement,
    ReactElement,
} from "react";

interface SvgIconProps {
    src?: string;
    children?: any;
    className?: string;
    width?: number | string;
    height?: number | string;
    fill?: string;
}

export default function SvgIcon({
    children,
    src,
    className,
    width,
    height,
    fill,
}: SvgIconProps) {
    const [svgContent, setSvgContent] = useState<string | null>(null);

    const wrapperStyle = {
        width: width || "20px",
        height: height || "20px",
        fill: fill || "var(--basicui-fg)",
    };

    useEffect(() => {
        const fetchSVG = async () => {
            try {
                const response = await fetch(src || "");
                const text = await response.text();
                setSvgContent(
                    text.replace(/<svg([^>]+)>/, (match, group) => {
                        const widthAttr = width ? `width="${width}" ` : "";
                        const heightAttr = height ? `height="${height}" ` : "";
                        return `<svg ${group} ${widthAttr}${heightAttr}>`;
                    })
                );
            } catch (error) {
                console.error("Failed to fetch SVG:", error);
            }
        };

        if (src) {
            fetchSVG();
        }
    }, [src, width, height]);

    const isSvgString = (content: any): content is string =>
        typeof content === "string" && content.trim().startsWith("<svg");

    if (!src && !children) return null;

    if (isValidElement(children)) {
        const existingStyle = (children as ReactElement)?.props?.style || {};

        const styledChild = cloneElement(children as ReactElement, {
            style: {
                ...existingStyle,
                width,
                height,
            },
        });

        return (
            <div className={`basicui-svgicon ${className || ""}`} style={wrapperStyle}>
                {styledChild}
            </div>
        );
    }

    if (!src && isSvgString(children)) {
        const parsed = children.replace(/<svg([^>]+)>/, (match, group) => {
            const widthAttr = width ? `width="${width}" ` : "";
            const heightAttr = height ? `height="${height}" ` : "";
            return `<svg ${group} ${widthAttr}${heightAttr}>`;
        });

        return (
            <div
                className={`basicui-svgicon ${className || ""}`}
                style={wrapperStyle}
                dangerouslySetInnerHTML={{ __html: parsed }}
            />
        );
    }

    if (!children && svgContent) {
        return (
            <div
                className={`basicui-svgicon ${className || ""}`}
                style={wrapperStyle}
                dangerouslySetInnerHTML={{ __html: svgContent }}
            />
        );
    }

    return (
        <div className={`basicui-svgicon ${className || ""}`} style={wrapperStyle}>
            {children}
        </div>
    );
}
