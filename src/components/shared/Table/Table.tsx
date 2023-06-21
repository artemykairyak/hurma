import clsx from 'clsx';
import { FC, ReactNode, cloneElement } from 'react';

import s from './Table.module.scss';

export interface HeaderItem {
  displayName: string;
  key: string | number;
  width?: string;
  isAdditional?: boolean;
  render?: (data?: any) => any;
}

export type TableItem = Record<string, any> & { id: string | number };

interface TableProps {
  loading: boolean;
  headerData: HeaderItem[];
  data: TableItem[];
  rowComponent?: (rowElement: ReactNode, rowData: TableItem) => ReactNode;
  additionalCell?: (rowData: TableItem) => ReactNode;
  className?: string;
  styles?: {
    header?: string;
    headerCeil?: string;
    row?: string;
    rowCeil?: string;
  };
}

const HeaderCeil: FC<{
  data: string | ReactNode;
  width?: string | undefined;
  className?: string | undefined;
}> = ({ data, className, width }) => {
  return (
    <div className={className} style={{ width }}>
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
    <div className={className} style={{ width }}>
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
  rowComponent,
  loading,
}) => {
  const getTableRow = (children: ReactNode, row: TableItem) => {
    return rowComponent ? (
      cloneElement(rowComponent(children, row), {
        className: clsx(s.row, styles?.row),
      })
    ) : (
      <div key={`row-${row.key}`} className={clsx(s.row, styles?.row)}>
        {children}
      </div>
    );
  };

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
            <div className={s.rowWrapper} key={`row-${row.id}`}>
              {getTableRow(
                <>
                  {headerData.map(({ key, render, width, isAdditional }) => {
                    if (isAdditional) {
                      return null;
                    }

                    return (
                      <Ceil
                        width={width}
                        key={`ceil-${key}-${row.id}`}
                        data={render ? render(row[key]) : row[key]}
                        className={styles?.rowCeil}
                      />
                    );
                  })}
                </>,
                row,
              )}
              {additionalCell && (
                <div key="additional" className={s.additional}>
                  {additionalCell(row)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
