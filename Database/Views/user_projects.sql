create VIEW user_projects as
select projects.id,projects.name,
    jt_users_projects.user_role
from projects
    join jt_users_projects on projects.id = jt_users_projects.projectid
where jt_users_projects.userid = ?