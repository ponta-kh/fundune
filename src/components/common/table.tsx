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
    /** ヘッダーセルに表示するテキストです。 */
    label: string;
    /** ヘッダーセル（`TableHead`）に適用するCSSクラスです。 */
    className?: string;
}

export interface TableColumn {
    /** ボディのセルに表示するコンテンツです。文字列やJSX要素を渡せます。 */
    value: React.ReactNode;
    /** ボディのセル（`TableCell`）に適用するCSSクラスです。 */
    className?: string;
}

export interface TableMainRow {
    /** 1行分のセルのデータ配列です。 */
    value: TableColumn[];
    /** 行全体（`TableRow`）に適用するCSSクラスです。 */
    className?: string;
}

export interface TableFooterColumn {
    /** フッターセルに表示するテキストです。 */
    value: string;
    /** フッターセル（`TableCell`）に適用するCSSクラスです。 */
    className?: string;
    /** フッターセルに適用する `colSpan` の値です。 */
    colSpan?: number;
}

export interface TableProps {
    /** テーブル下部に表示するキャプション（補足説明）です。 */
    caption?: string;
    /** テーブルヘッダーの定義です。`TableHeaderColumn` の配列を渡します。 */
    headerRow: TableHeaderColumn[];
    /** テーブルのボディに表示するデータです。`TableMainRow` の配列を渡します。 */
    data: TableMainRow[];
    /** テーブルフッターの定義です。`TableFooterColumn` の2次元配列を渡して複数行のフッターを表現します。 */
    footerRows?: TableFooterColumn[][];
}

/**
 * @component Table
 * @description データ構造を定義して動的に行と列を生成する汎用テーブルコンポーネントです。
 *
 * ## 機能
 * - ヘッダー、ボディ、フッター、キャプションをサポートします。
 * - データが空の場合、専用のメッセージを表示します。
 * - フッターは複数行に対応しており、`colSpan` を使ったセルの結合が可能です。
 *
 * ## 依存関係
 * このコンポーネントは `shadcn/ui` の `Table` 関連コンポーネントに依存しています。
 *
 * ## スタイリング
 * - `className` を通じて、各`TableRow`, `TableHead`, `TableCell`に個別のスタイルを適用できます。
 *
 * @example
 * ```tsx
 * const header = [
 *   { label: "商品ID", className: "w-24" },
 *   { label: "商品名" },
 *   { label: "価格", className: "text-right" },
 * ];
 *
 * const data = [
 *   { value: [{ value: "#001" }, { value: "リンゴ" }, { value: "150円", className: "text-right" }] },
 *   { value: [{ value: "#002" }, { value: "バナナ" }, { value: "100円", className: "text-right" }] },
 * ];
 *
 * const footer = [
 *   [
 *     { value: "合計", colSpan: 2, className: "text-right font-bold" },
 *     { value: "250円", className: "text-right font-bold" },
 *   ],
 * ];
 *
 * <Table
 *   caption="商品リスト"
 *   headerRow={header}
 *   data={data}
 *   footerRows={footer}
 * />
 * ```
 */
export function Table({ caption, headerRow, data, footerRows }: TableProps) {
    return (
        <ShadcnTable>
            {caption && <TableCaption>{caption}</TableCaption>}

            <TableHeader>
                <TableRow>
                    {headerRow.map((col, idx) => (
                        <TableHead key={idx} className={col.className} scope="col">
                            {col.label}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>

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