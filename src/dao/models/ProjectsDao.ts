import { DaoBase } from "./DaoBase";
import {IProject} from "@libs/projects/projects"
import * as File from 'fs'

export class ProjectDao extends DaoBase<IProject>{
    private memoryProjects: IProject[] = [];
    private createdProjects = 0;   

    public create(item: IProject): Promise<IProject> {
        const newProject = {...item};
    newProject._id = (++this.createdProjects).toString();
    newProject.createdAt = new Date();
    newProject.updatedAt = newProject.createdAt;
    this.memoryProjects.push(newProject);
    this.serialize()
    return Promise.resolve(newProject);
    }
    public update(id: string, item: Partial<IProject>): Promise<IProject> {
        const index = this.memoryProjects.findIndex(p => p._id === id);
        if (index === -1) throw new Error('Project not found');
    
        this.memoryProjects[index] = { ...this.memoryProjects[index], ...item, updatedAt: new Date() };
        this.serialize()
        return Promise.resolve(this.memoryProjects[index]);
    }
    public delete(id: string): Promise<boolean> {
        const index = this.memoryProjects.findIndex(p => p._id === id);
    if (index === -1) throw new Error('Project not found');
    this.memoryProjects.splice(index, 1);
    return Promise.resolve(true);
    }
    public find(_item: Partial<IProject>): Promise<IProject[]> {
        return Promise.resolve(this.memoryProjects);
    }
    public findOne(id: string): Promise<IProject> {
        const project = this.memoryProjects.find(p=>p._id === id);
        if(!project) throw new Error('Project not found');
        return Promise.resolve(project);
    }

    private serialize(): void{
        const data = JSON.stringify({memoryProjects:this.memoryProjects, createdProjects:this.createdProjects})
        File.writeFileSync('projects.json',data);
    }

    private deserialize(): void{
        try{const data = File.readFileSync('projects.json', 'utf-8');
        const {memoryProjects, createdProjects} = JSON.parse(data);
        this.memoryProjects = memoryProjects;
        this.createdProjects = createdProjects;}
        catch(error){
            console.log('Error reading projects.json', Error);
        }

    }
    constructor(){
        super();
        this.deserialize()
    }
}