


function Users(){
return `<div class="users">
            
            
                

              <div class="search">
            <input type="text"id="my input" placeholder="search">
            </div>

            <table id="table-users">
            
                <tr>
                    <th>number</th>
                    <th>first name</th>
                    <th>Last name</th>
                    <th>Email</th>
                
                </tr>
            </div>
        

    
                
                
                
                
                    </table>
   
   </div>




`



}


function UserItem(res,n){
return`<tr id="item">
<td>${n}</td>                       
<td>${res.firstName}</td>
   <td> ${res.lastName}</td>
   <td>${res.email}</td>
   
</tr>`
}


export {UserItem,Users}