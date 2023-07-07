const queue=require('../config/kue');
const commentMailer=require('../controllers/mailers/comments_mailers');
queue.process('email',function(job,done){
    console.log('email worker is processing a job',job.data);
    commentMailer.newComment(job.data);
    done();
})