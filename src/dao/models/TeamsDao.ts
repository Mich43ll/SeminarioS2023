import { DaoBase } from "./DaoBase";
import {ITeam} from "@libs/teams/teams"
import * as File from 'fs'

export class TeamDao extends DaoBase<ITeam>{
    private memoryTeams: ITeam[] = [];
    private createdTeams = 0;

    public create(item: ITeam): Promise<ITeam> {
        const newTeam = {...item};
        newTeam.id =(++this.createdTeams).toString();
        newTeam.createdAt = new Date();
        newTeam.updatedAt = newTeam.createdAt;
        this.memoryTeams.push(newTeam);
        this.serialize();
        return Promise.resolve(newTeam);
    }

    public update(id: string, item: Partial<ITeam>): Promise<ITeam> {
        const index = this.memoryTeams.findIndex(p => p.id === id);
        if (index === -1) throw new Error('Team not found');

        this.memoryTeams[index] = {...this.memoryTeams[index], ...item, updatedAt: new Date()};
        this.serialize();
        return Promise.resolve(this.memoryTeams[index]);

    }
    
    public delete(id: string): Promise<boolean> {
        const index = this.memoryTeams.findIndex(p => p.id === id);
        if (index === -1) throw new Error('Team not found');
        this.memoryTeams.splice(index, 1);
        return Promise.resolve(true)
    }

    public find(_item: Partial<ITeam>): Promise<ITeam[]> {
        return Promise.resolve(this.memoryTeams);
    }

    public findOne(id: string): Promise<ITeam> {
        const team = this.memoryTeams.find(p=>p.id === id);
        if(!team) throw new Error('Team not found');
        return Promise.resolve(team);
    }

    private serialize(): void{
        const data = JSON.stringify({memoryTeams:this.memoryTeams, createdTeams:this.createdTeams})
        File.writeFileSync('teams.json',data);
    }

    private desearilize(): void{
        try {const data = File.readFileSync('teams.json', 'utf-8');
    const {memoryTeams, createdTeams} = JSON.parse(data);
    this.memoryTeams = memoryTeams;
    this.createdTeams = createdTeams;
    }catch(error){
        console.log('Error reading teams.json', Error);}
    }

    constructor(){
        super();
        this.desearilize();
    }
}

