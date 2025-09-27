import {
    Table as ShadcnTable,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/shadcn/table";

export interface TableHeaderColumn {
    /** ヘッダー名 */
    label: string;
    /** ヘッダーセルに付与する Tailwind クラス（任意） */
    className?: string;
}

export interface TableColumn {
    /** セル値（JSXを描画したい可能性を考慮） */
    value: React.ReactNode;
    /** ヘッダーセルに付与する Tailwind クラス（任意） */
    className?: string;
}

export interface TableMainRow {
    /** 行に表示する値の配列 */
    value: TableColumn[];
    /** 行全体に付与する Tailwind クラス（任意） */
    className?: string;
}

export interface TableFooterColumn {
    /** フッターセル値 */
    value: string;
    /** フッターセルに付与する Tailwind クラス（任意） */
    className?: string;
    /** フッターセルのcol-span値（任意） */
    colSpan?: number;
}

export interface TableProps {
    /** テーブルキャプション（任意） */
    caption?: string;
    /** ヘッダー定義 */
    headerRow: TableHeaderColumn[];
    /** 表示するデータ */
    data: TableMainRow[];
    /** フッター定義 */
    footerRows?: TableFooterColumn[][];
}

/**
 * 汎用テーブルコンポーネント
 *
 * - Shadcn UI の Table をベースにした汎用テーブル
 * - カラム定義とデータを渡すことで動的に描画可能
 *
 * @example
 * ```tsx
 * import { Table } from "@/components/Table";
 *
 * const header = [
 *   { label: "ID", className: "w-20 text-center" },
 *   { label: "名前" },
 *   { label: "年齢", className: "text-right" },
 * ];
 *
 * const data = [
 *   [
 *     { value: "1", className: "text-center" },
 *     { value: "田中 太郎" },
 *     { value: "28", className: "text-right" },
 *   ],
 *   [
 *     { value: "2", className: "text-center" },
 *     { value: "山田 花子" },
 *     { value: "32", className: "text-right" },
 *   ],
 * ];
 *
 * const footer = [
 *   { value: "合計", colSpan: 2, className: "font-bold text-right" },
 *   { value: "60", className: "text-right font-bold" },
 * ];
 *
 * export default function Page() {
 *   return (
 *     <Table
 *       caption="社員一覧"
 *       headerRow={header}
 *       data={data}
 *       footerRows={footer}
 *     />
 *   );
 * }
 * ```
 */
export function Table({ caption, headerRow, data, footerRows }: TableProps) {
    return (
        <ShadcnTable>
            {/* テーブルの補足説明（オプション） */}
            {caption && <TableCaption>{caption}</TableCaption>}

            {/* ヘッダー部分 */}
            <TableHeader>
                <TableRow>
                    {headerRow.map((col, idx) => (
                        <TableHead key={idx} className={col.className} scope="col">
                            {col.label}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>

            {/* ボディ部分 */}
            <TableBody>
                {data.length > 0 ? (
                    data.map((row, rowIndex) => (
                        <TableRow key={rowIndex} className={row.className}>
                            {row.value.map((col, colIndex) => (
                                <TableCell key={colIndex} className={col.className}>
                                    {col.value}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={headerRow.length} className="h-24 text-center">
                            表示するデータがありません。
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            {/* テーブルフッター（オプション） */}
            {footerRows && (
                <TableFooter>
                    {footerRows.map((footerRow, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {footerRow?.map((col, idx) => (
                                <TableCell key={idx} className={col.className} colSpan={col.colSpan}>
                                    {col.value}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableFooter>
            )}
        </ShadcnTable>
    );
}
