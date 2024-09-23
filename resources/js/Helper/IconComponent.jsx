import { useState, useEffect } from "react";

export default function IconComponent({ iconName, packageName }) {
    const [IconComponent, setIconComponent] = useState(null);

    useEffect(() => {
        const loadIcon = async () => {
            try {
                const iconModule = await import(`react-icons/${packageName}/index.js`);
                setIconComponent(() => iconModule[iconName]);
            } catch (error) {
                console.error("Icon not found", error);
            }
        };

        loadIcon();
    }, [iconName, packageName]);

    if (!IconComponent) return null;

    return <IconComponent className="text-md"/>;
};

