"use client";

import Link from "next/link";
import {DeleteButton} from "@/features/products";

export default function ProductAdminControls({productId}) {
    return (
        <div className="mt-4 flex space-x-2 border-t pt-3">
            <Link
                href={`/products/${productId}/edit`}
                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600">
                Düzenle
            </Link>
            <DeleteButton productId={productId}/>
        </div>
    );
}