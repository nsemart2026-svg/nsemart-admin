'use client';

export function DataTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 w-full max-w-full   overflow-auto">
      <table className="min-w-[700px] w-full text-sm">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="text-left p-3">NAME</th>
            <th className="text-left p-3">PHONE NUMBER</th>
            <th className="text-left p-3">CREATED</th>
            <th className="text-left p-3">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          <tr className="border-t">
            <td className="p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-400" />
              <div>
                <div className="font-medium">Robert Fox</div>
                <div className="text-gray-500 text-xs">robert.fox@example.com</div>
              </div>
            </td>
            <td className="p-3">(201) 555-0124</td>
            <td className="p-3">27 July 2025</td>
            <td className="p-3 flex gap-3">
              <button className="text-blue-500 hover:underline text-xs">Edit</button>
              <button className="text-red-500 hover:underline text-xs">Delete</button>
            </td>
          </tr>

          <tr className="border-t">
            <td className="p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-400" />
              <div>
                <div className="font-medium">Theresa Webb</div>
                <div className="text-gray-500 text-xs">theresa.webb@example.com</div>
              </div>
            </td>
            <td className="p-3">(303) 555-0142</td>
            <td className="p-3">25 July 2025</td>
            <td className="p-3 flex gap-3">
              <button className="text-blue-500 hover:underline text-xs">Edit</button>
              <button className="text-red-500 hover:underline text-xs">Delete</button>
            </td>
          </tr>

          <tr className="border-t">
            <td className="p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-pink-400" />
              <div>
                <div className="font-medium">Jenny Wilson</div>
                <div className="text-gray-500 text-xs">jenny.wilson@example.com</div>
              </div>
            </td>
            <td className="p-3">(404) 555-0178</td>
            <td className="p-3">22 July 2025</td>
            <td className="p-3 flex gap-3">
              <button className="text-blue-500 hover:underline text-xs">Edit</button>
              <button className="text-red-500 hover:underline text-xs">Delete</button>
            </td>
          </tr>

          <tr className="border-t">
            <td className="p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-400" />
              <div>
                <div className="font-medium">Cody Fisher</div>
                <div className="text-gray-500 text-xs">cody.fisher@example.com</div>
              </div>
            </td>
            <td className="p-3">(509) 555-0132</td>
            <td className="p-3">20 July 2025</td>
            <td className="p-3 flex gap-3">
              <button className="text-blue-500 hover:underline text-xs">Edit</button>
              <button className="text-red-500 hover:underline text-xs">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
