use uuid::Uuid;
use worldmodel::{Entity,Relation,WorldGraph};
#[test] fn rejects_dangling_relation(){let mut g=WorldGraph::new();let a=Uuid::now_v7();g.add_entity(Entity{entity_id:a,name:"a".into(),entity_type:"test".into()});assert!(g.add_relation(Relation{source:a,target:Uuid::now_v7(),relation:"links".into(),confidence:0.8}).is_err());}
