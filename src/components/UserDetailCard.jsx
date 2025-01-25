import React from 'react';

function UserDetailCard({ data }) {
    
  return (
   
<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Cnic
                </th>
                <th scope="col" class="px-6 py-3">
                    department
                </th>
                <th scope="col" class="px-6 py-3">
                    purpose
                </th>
                <th scope="col" class="px-6 py-3">
                    status
                </th>
            </tr>
        </thead>
        <tbody>
           
           {
            data?.map((value)=>{
                return(
                    <tr class="bg-white dark:bg-gray-800" >
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {value?.name}
                    </th>
                    <td class="px-6 py-4">
                    {value?.cnic}

                    </td>
                    <td class="px-6 py-4">
                    {value?.department}

                    </td>
                    <td class="px-6 py-4">
                    {value?.purpose}

                    </td>
                    <td class="px-6 py-4">
                    {value?.status}

                    </td>
                </tr>
                )
            })
            }
        </tbody>
    </table>
</div>

  );
}

export default UserDetailCard;
