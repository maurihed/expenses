import { IconName, IconPrefix, findIconDefinition, icon } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type IconProps = {
    prefix?: IconPrefix,
    name: IconName,
    className?: string
};

function Icon({ prefix = "fas", name, className = "" }: IconProps) {
    const iconObj = findIconDefinition({prefix, iconName: name });
    const foundIcon = icon(iconObj);
    return <div style={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        width: "20px",
        height: "20px",
    }}>
        <FontAwesomeIcon icon={foundIcon} className={className} />
    </div>;
}

export default Icon;
