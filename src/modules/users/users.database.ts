import { EntityRepository, getConnection, Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { format } from '@scaleleap/pg-format'


export async function insertRecord(values: any) {
	console.log('value ', values);
  	const sql = `
    INSERT INTO 
      "users" 
      ("email", "status") 
    VALUES
      ($1, $2)`

  const result = await getConnection().query(sql, values)
  return result
}

export async function getDataByEmail(email: string) {

  const sql = `
    SELECT 
      *
    FROM
      "users"
    WHERE 
      "email" = $1`

  const result = await getConnection().query(sql, [email])
  return result
}
