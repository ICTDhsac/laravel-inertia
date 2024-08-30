import { useForm } from "@inertiajs/react";


export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        body: '',
    })

  return (
    <>
        <div className="title">Create a new Post</div>

        <div className="w-1/2 m-auto">
            <form>
                <textarea className="w-full h-28 p-2 border border-gray-300 rounded"></textarea>
                <div className="flex justify-end mt-2">
                    <button className="btn btn-success">Create</button>
                </div>
            </form>
        </div>
    </>
  )
}
