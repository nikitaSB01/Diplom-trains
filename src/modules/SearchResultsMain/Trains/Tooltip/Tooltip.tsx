import React from "react";
import styles from "./Tooltip.module.css";
import { ReactComponent as Ruble } from "../../../../assets/icons/Train/ruble.svg";
import { formatPrice } from "../../../../utils/format";

interface TooltipItem {
  label: string;
  price: number;
  count?: number;
}

interface TooltipProps {
  items: TooltipItem[];
}

const Tooltip: React.FC<TooltipProps> = ({ items }) => {
  return (
    <div className={styles.tooltip}>
      {items.map((row, i) => (
        <div key={i} className={styles.tooltipRow}>
          <span className={styles.tooltipLabel}>{row.label}</span>
          <span className={styles.tooltipCount}>{row.count}</span>
          <span className={styles.tooltipPrice}>
            {formatPrice(row.price)}
            <Ruble className={styles.rubleIcon} />
          </span>
        </div>
      ))}
    </div>
  );
};

export default Tooltip;