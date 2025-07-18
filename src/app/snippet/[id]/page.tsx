import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import * as actions from "@/actions"

const SnippetDetailPage = async ({ params }: { params: { id: string } }) => {

    const id = parseInt((params).id)

    const snippet = await prisma.snippet.findUnique({
        where: {
            id,
        }
    })

    if (!snippet) return <div>Not found</div>;

    const deleteSnippetActions = actions.deleteSnippet.bind(null, snippet.id)


    return (
        <div className="flex flex-col gap-5 container mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-xl">{snippet.title}</h1>
                <div className="flex items-center gap-2">
                    <Link href={`/snippet/${snippet.id}/edit`}>
                        <Button>Edit</Button>
                    </Link>
                    <form action={deleteSnippetActions}>
                        <Button type="submit">
                            Delete
                        </Button>
                    </form>
                </div>
            </div>
            <pre className="p-3 bg-gray-200 rounded border-gray-200">
                <code>{snippet.code}</code>
            </pre>
        </div>
    );
};

export default SnippetDetailPage;


export const generateStaticParams = async () => {
    const snippets = await prisma.snippet.findMany();

    //we need only id to pass them fast 
    return snippets.map((snippet) => {
        return { id: snippet.id.toString() }
    })
}
