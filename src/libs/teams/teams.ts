
import { TeamDao } from "@server/dao/models/TeamsDao";
export interface ITeam{
    id?: string;
    name: string;
    description: string;
    members?: string[];
    owner?: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
const TeamDaoInstance = new TeamDao();

export const createTeam = async (team: ITeam) => {
    return TeamDaoInstance.create(team);
}

export const getTeams = async() => {
    return TeamDaoInstance.find({});
};

export const getTeam =async (id:string) => {
    return TeamDaoInstance.findOne(id)
}

export const updateTeam = ( id:string, team:Partial<ITeam>) => { //partial hace que todos los atributos sean opcionales
    return TeamDaoInstance.update(id, team);
  }
  
  export const deleteTeam = (id:string) => {
    return TeamDaoInstance.delete(id)
  }