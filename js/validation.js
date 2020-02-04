var joinValidate = {
	// 결과 메세지 출력시 사용하는 Text
	resultCode : {
		// 공통
		empty_val : {
			code: 1,
			desc : '필수 정보입니다.'
		},
		space_length_val : {
			code: 2,
			desc : '공백없이 입력해주세요.'
		},
		//ID
		success_id : {
			code: 0,
			desc : '멋진 아이디네요:)'
		},
		specialStr_id : {
			code: 3,
			desc :'특수문자는 대시(-), 언더바(_)만 이용 가능합니다.'
		},
		invalid_id: {
			code: 4,
			desc : '아이디는 영문 소문자, 숫자, 특수기호 일부만 사용 할 수 있습니다.'
		},
		first_special_id : {
			code: 5,
			desc : '첫 글자는 특수문자를 이용하실 수 없습니다.'
		},
		length_id : {
			code: 6,
			desc : 'ID는 공백없이 5~20자 이하여야 합니다.'
		},
		overlap_id : {
			code: 7,
			desc : '이미 사용 중인 ID 입니다.'
		},
		//pw
		success_pw : {
			code: 0,
			desc : '사용가능한 비밀번호입니다.'
		},
		equal_success_pw : {
				code: 10,
				desc: '사용가능한 비밀번호입니다.'
		},
		invalid_pw : {
			code: 3,
			desc : '비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.'
		},
		stream_pw : {
			code: 4,
			desc : '같은 문자를 4번 이상 사용하실 수 없습니다.'
		},
		hangle_pw : {
			code : 5,
			desc : '비밀번호에 한글은 사용하실 수 없습니다.'
		},
		other_pw : {
			code: 6,
			desc : '입력하신 비밀번호가 일치하지 않습니다.'
		},
		equal_pw : { // 회원가입 유효성 체크 때 사용x , 회원정보수정 때 비밀번호 변경시 때 사용
			code: 7,
			desc : '현재비밀번호와 다르게 입력해주세요.'
		},
		//name
		success_name : {
			code: 0,
			desc : '멋진이름이네요:)'
		},
		invalid_name : {
			code: 3,
			desc : '이름은 표준한글만 입력가능합니다.'
		},
		length_name : {
			code: 4,
			desc : '이름은 2자이상 ~ 20자이하만 가능합니다.'
		},
		//phone
		success_phone : {
			code: 0,
			desc : '사용 가능한 번호입니다.'
		},
		invalid_phone : {
			code: 3,
			desc : '휴대폰 번호가 유효하지 않습니다'
		},
		length_phone : {
			code: 4,
			desc : '(-)없이 10, 11자로 입력해주세요'
		},
		number_phone : {
			code: 5,
			desc : '숫자만 입력해주세요.'
		},

		//email
		success_email : {
			code: 0,
			desc: '사용가능한 이메일입니다.'
		},
		invalid_email : {
			code: 3,
			desc: '올바른 이메일을 입력해주세요.'
		},
		//address
		success_post: {
			code : 0,
			desc : '확인되었습니다.'
		},
		empty_post : {
			code: 3,
			desc: '우편번호 찾기를 클릭하고 값을 입력해주세요.'
		},
		empty_detail : {
			code: 4,
			desc: '상세주소를 입력해주세요.'
		},
		invalid_addr : {
			code : 5,
			desc : '올바른 주소를 입력해주세요.'
		}
	
	},

	// 아이디 유효성 체크
	checkId : function(id){
		// 매개변수로 받은 id 값을 유효성 체크 하세요

		var regEmpty =/\s/g; // 공백문자
		var regEtc = /[~`!@#$%^&*()+=\|\\\{\}\[\]:";'<>.,?//]/g; // 특수문자 
		var regId = /[^a-z0-9-_.]+/g; // 올바른 아이디 형식

		if(id == '' || id.length == 0){ //1.값이 있는지 없는지 체크
				return this.resultCode.empty_val;
				// = joinValidate.resultCode.empty_val
			}else if(id.match(regEmpty)){ //2.값사이에 공백이 있는지 체크
				return this.resultCode.space_length_val;				
			}else if(id.match(regEtc)){ //3.특수문자 체크 (-,_,.만 가능)
				return this.resultCode.specialStr_id;
			}else if(id.match(regId)){ //4.아이디 정규식 체크
				return this.resultCode.invalid_id;
			}else if(id.charAt(0) == '-' || id.charAt(0) == '_'){ // 5. 첫글자로 특수문자 사용불가
				return this.resultCode.first_special_id;
			}else if(id.length < 5 || id.length > 20){ // 6. 길이(5~20자 이내)
				return this.resultCode.length_id;
			}else{
				return this.resultCode.success_id;
			}
	},
	//비밀번호 유효성체크
	checkPw : function(pw,rpw){
		var regEmpty = /\s/g; // 공백문자
		var regPw = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&_*-]).{8,}$/;
		var regHangle =  /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

		if(pw == '' || pw.length == 0){ // 1. 값이 있는지 체크
			return this.resultCode.empty_val;
		} else if(pw.match(regEmpty)){ // 2. 공백값이 있는지 체크
			return this.resultCode.space_length_val;
		} else if(!pw.match(regPw)){ // 3. 유효한 비밀번호 체크 → 정규식이 있어야함
			// ^ 있을시 앞에 ! 붙여야됌 ^과 같이 있는 값들을 true로 해버림
			return this.resultCode.invalid_pw;
		}else if(/(\w)\1\1\1/.test(pw)){ // 4. 같은 값이 4번 연속으로 사용했는지 체크
			return this.resultCode.stream_pw;
		}else if(regHangle.test(pw)){ // 5. 한글 사용 체크
			return this.resultCode.hangle_pw;
		}else if(rpw != '' || rpw.length != 0 ){ //6.비밀번호 재확인 값이 있으면 실행 
			
			if(pw == rpw){ // pw값과 rpw값이 같으면
				return this.resultCode.equal_success_pw; // 성공!
									// → equal_:
			}else{
				return this.resultCode.other_pw;
			}
		}else{	
			return this.resultCode.success_pw;
		}
	},
	checkRpw : function(pw, rpw, pwFlag){ 
		// 비밀번호의 유효성 체크를 통과한 값과
		// 비밀번호 재확인 값이 같다면
		// 비밀번호 재확인 값은 유효성체크를 할 필요가 없음
		if(rpw == '' || rpw.length == 0){ // 1. 값이 있는지 없는지 체크
			return this.resultCode.empty_val;
		}else if(!pwFlag){ // 2. pw가 올바를때
				return this.resultCode.invalid_pw;
		}else{ //2. pw == rpw 가 같은지 비교
			if(pw == rpw && pwFlag){ // pw값과 rpw값이 같으면
				return this.resultCode.equal_success_pw; // 성공!		
			}else{
				return this.resultCode.other_pw;
			}
		}
	},
	checkName: function(name){
		// 1. 공백이 있는지 없는지 체크
		var regEmpty = /\s/g; // 공백문자
		var regName = /^[가-힣a-zA-Z]+$/;

		if(name == '' || name.length == 0){ // 1. 값의 유무
			return this.resultCode.empty_val;
		}else if(name.match(regEmpty)){ // 2. 공백유무
			return this.resultCode.space_length_val;
		}else if(!name.match(regName)){
			return this.resultCode.invalid_name;
		}else if(name.length < 2 || name.length > 20){ // 3. 2~20자 사이의 글자 넣기 
			return this.resultCode.length_name;
		}else{ // 다 통과하면
			return this.resultCode.success_name;
		}

	},
	checkPhone: function(phone){
		//1.공백이 있는지 없는지 체크
		var regEmpty = /\s/g;
		var regPhone = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/g;

		if(phone == '' || phone.length == 0){
			return this.resultCode.empty_val;
		}else if(phone.match(regEmpty)){
			return this.resultCode.space_length_val;
		}else if(phone.match(regPhone)){
			return this.resultCode.invalid_phone;
		}else if(phone.length < 10 || phone.length > 11){
			return this.resultCode.length_phone;
		}else{
			return this.resultCode.success_phone;
		}
	},
	checkEmail: function(email){
		
		var regEmpty = /\s/g; //공백이 있는지 없는지 체크
		var regEmail =/^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/g; // 이메일 유효한 문자 체크

		if(email == '' || email.length == 0){ //1. 값 유무체크
			return this.resultCode.empty_val;
		}else if(email.match(regEmpty)){ // 2. 공백 체크
				return this.resultCode.space_length_val;
		}else if(!email.match(regEmail)){ // 3. 정규식 체크
			return this.resultCode.invalid_email;
		}else{ // 4.통과
			return this.resultCode.success_email;
		}
	},
	checkAddr: function(addrDetail, addrPost){
		var regAddr = /^[a-zA-Z0-9가-힣-\s]+$/;
		if(addrPost == '' || addrPost.length == 0){
			// return this.resultCode.empty_val; : 해버리면 값이 0이 되서 디자인이 같아져버림
			return this.resultCode.empty_post;
		}else if(addrDetail == '' || addrDetail.length == 0){
			return this.resultCode.empty_detail;
		}else if(!addrDetail.match(regAddr)){
			return this.resultCode.invalid_addr;	
		}
		else{
			return this.resultCode.success_post;
		}
	}

}