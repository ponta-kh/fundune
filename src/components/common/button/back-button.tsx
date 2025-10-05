import { useRouter } from "next/navigation";
import { Button } from "@/components/shadcn/button";

interface BackButtonProps {
    /** ボタンに表示するテキスト（デフォルト: "戻る"） */
    context?: string;
    /** 追加のCSSクラス */
    className?: string;
    /** 戻る先のパス。未指定の場合はブラウザの履歴を戻る */
    backTo?: string;
}

/**
 * 戻るボタンコンポーネント
 *
 * `backTo` が指定されていればそのパスへ遷移し、
 * 未指定の場合は `router.back()` を実行して履歴を1つ戻ります。
 *
 * @component
 * @example
 * ```tsx
 * <BackButton /> // 「戻る」と表示され履歴を戻る
 * <BackButton context="トップに戻る" backTo="/" /> // "/" に遷移
 * ```
 */
export default function BackButton({ context = "戻る", className, backTo }: BackButtonProps) {
    const router = useRouter();

    function handleBack() {
        if (backTo) {
            router.push(backTo);
        } else {
            router.back();
        }
    }

    return (
        <Button variant="secondary" className={className} onClick={handleBack}>
            {context}
        </Button>
    );
}
