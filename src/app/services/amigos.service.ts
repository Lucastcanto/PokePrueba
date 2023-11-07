import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { amistad } from '../models/amistad.model';

@Injectable({
  providedIn: 'root'
})
export class AmigosService {
  apiUrlFollowers = "https://api-tpi-production.up.railway.app/api/followers"
  apiUrlFollowed = "https://api-tpi-production.up.railway.app/api/followed"
  apiUrlFollow = "https://api-tpi-production.up.railway.app/api/follow"

  constructor(private http:HttpClient) { }

  getFollowers(id: string){
    let response = this.http.get<amistad[]>(this.apiUrlFollowers+"/"+id)

    return response
  }

  getFollowed(id: string){
    let response = this.http.get<amistad[]>(this.apiUrlFollowed+"/"+id)

    return response
  }

  createFollow(seguidorId: string, seguidoId:string){
    console.log(seguidorId, seguidoId)
    let headers = {'Content-Type':'application/json', 'charset': 'utf-8'}
    let body = JSON.stringify({
      seguidorID: seguidorId,
      seguidoID: seguidoId
    })

    let response = this.http.post<amistad>(this.apiUrlFollow, body, {headers})

    return response
  }

  deleteFollow(seguidorId: string, seguidoId:string){
    console.log(seguidorId, seguidoId)
    let headers = {'Content-Type':'application/json', 'charset': 'utf-8'}
    let body = JSON.stringify({
      seguidorID: seguidorId,
      seguidoID: seguidoId
    })

    let options = {headers: headers, body: body}

    let response = this.http.delete(this.apiUrlFollow, {headers, body})

    return response
  }
}
