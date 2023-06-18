import clsx from 'clsx';
import {
  FC,
  ReactNode,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from 'react';

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
  const additionalRowRef = useRef<HTMLDivElement | null>(null);
  const bodyRowRef = useRef<HTMLDivElement | null>(null);
  const [bodyStyles, setBodyStyles] = useState({ paddingRight: '', width: '' });

  useEffect(() => {
    if (additionalRowRef.current?.offsetWidth) {
      const hasScrollbar =
        bodyRowRef.current?.scrollHeight > bodyRowRef.current?.clientHeight;
      const scrollbarWidth =
        bodyRowRef.current?.offsetWidth - bodyRowRef.current?.clientWidth;

      setBodyStyles({
        paddingRight: `calc(${additionalRowRef.current?.offsetWidth}px + ${scrollbarWidth}px + 30px)`,
        width: `calc(100% + ${
          additionalRowRef.current?.offsetWidth
        }px + 30px + ${hasScrollbar ? 20 + scrollbarWidth + 'px' : '15px'})`,
      });
    }
  }, [additionalRowRef.current]);

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
      <div className={s.body} style={bodyStyles} ref={bodyRowRef}>
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
                <div
                  key="additional"
                  className={s.additional}
                  ref={additionalRowRef}
                >
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
