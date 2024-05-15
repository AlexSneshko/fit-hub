// export async function DELETE(req: Request, { params }: { params: { postId: string } }) {
//     try {
//         const { userId } = auth();
//         const { postId } = params;
//         if (!userId) {
//             return new NextResponse("Unauthorized", { status: 401 })
//         }

//         const post = await db.post.delete({
//             where: {
//                 id: postId
//             }
//         })
//         return NextResponse.json(post)
//     } catch (error) {
//         console.log("[POST_ID]", error);
//         return new NextResponse("Internal error", { status: 500 })
//     }
// }

// export async function PATCH(req: Request, { params }: { params: { postId: string } }) {
//     try {
//         const { userId } = auth();
//         const { postId } = params;
//         if (!userId) {
//             return new NextResponse("Unauthorized", { status: 401 })
//         }
//         const values = await req.json();
//         const post = await db.post.update({
//             where: {
//                 id: postId
//             },
//             data: {
//                 ...values
//             }
//         })
//         return NextResponse.json(post)
//     } catch (error) {
//         console.log("[POST_ID]", error);
//         return new NextResponse("Internal error", { status: 500 })
//     }
// }