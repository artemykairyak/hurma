import clsx from 'clsx';
import { FC, ReactNode } from 'react';

import s from './Table.module.scss';

interface TableProps {
  headerData: TableItem[];
  data: Record<any, any> & { key: string | number }[];
  additionalCell?: ReactNode;
  className?: string;
  styles?: {
    header?: string;
    headerCeil?: string;
    row?: string;
    rowCeil?: string;
  };
}

export interface TableItem {
  displayName: string;
  key: string | number;
  width?: string;
  isAdditional?: boolean;
  render?: (data?: any) => any;
}

const HeaderCeil: FC<{
  data: string | ReactNode;
  width?: string | undefined;
  className?: string | undefined;
}> = ({ data, className, width }) => {
  return (
    <div className={clsx(s.headerCeil, className)} style={{ width }}>
      {data}
    </div>
  );
};

const Ceil: FC<{
  data: string | ReactNode;
  width?: string | undefined;
  className?: string | undefined;
}> = ({ data, className, width }) => {
  return (
    <div className={clsx(s.ceil, className)} style={{ width }}>
      {data}
    </div>
  );
};

export const Table: FC<TableProps> = ({
  headerData,
  data,
  additionalCell,
  styles,
  className,
}) => {
  return (
    <div className={clsx(s.table, className)}>
      <div className={clsx(s.header, styles?.header)}>
        {headerData.map((item) => {
          return (
            item.displayName && (
              <HeaderCeil
                width={item?.width}
                key={`headerCeil-${item.key}`}
                data={item.displayName}
                className={styles?.headerCeil}
              />
            )
          );
        })}
      </div>
      <div className={s.body}>
        {data.map((row) => {
          return (
            <div className={s.rowWrapper}>
              <div key={`row-${row.key}`} className={clsx(s.row, styles?.row)}>
                {headerData.map(({ key, render, width, isAdditional }) => {
                  if (isAdditional) {
                    return null;
                  }

                  return (
                    <Ceil
                      width={width}
                      key={`ceil-${key}-${row.key}`}
                      data={render ? render(row[key]) : row[key]}
                      className={styles?.rowCeil}
                    />
                  );
                })}
              </div>
              {additionalCell && (
                <div className={s.additional}>{additionalCell}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
